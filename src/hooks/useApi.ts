import { api } from "@/lib/api";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export type ApiError = {
  response?: {
    data?: unknown;
    status?: number;
  };
  message?: string|null;
};

type MutationMethod = "post" | "patch" | "delete";

type ApiMutationOptions<TResponse, TParams, TContext> = Omit<
  UseMutationOptions<TResponse, ApiError, TParams, TContext>,
  "onSuccess"
> & {
  onSuccess?: (
    data: TResponse,
    variables: TParams,
    context: TContext,
  ) => Promise<unknown> | unknown;
  invalidateKeys?: string[];
};

export function useApiQuery<TResponse = unknown, TParams = unknown>(
  route: string,
  params?: TParams,
  options?: Omit<UseQueryOptions<TResponse, ApiError>, "queryKey" | "queryFn">,
) {
  const result = useQuery<TResponse, ApiError>({
    // The queryKey uniquely identifies this request.
    // We include 'params' so the query automatically refetches if params change.
    queryKey: [route, params],
    queryFn: async () => {
      // 'params' here sends query parameters (e.g., ?id=1)
      const res = await api.get<TResponse>(route, { params });
      return res.data;
    },
    ...options,
  });

  const isLoading = result.isLoading || result.isFetching;

  return { ...result, isLoading };
}

export function useApiMutation<
  TResponse = unknown,
  TParams = unknown,
  TContext = unknown,
>(
  method: MutationMethod,
  route: string,
  options?: ApiMutationOptions<TResponse, TParams, TContext>,
) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restOptions } = options || {};

  const result = useMutation<TResponse, ApiError, TParams, TContext>({
    mutationFn: async (variables) => {
      // Handle different Axios signatures
      // POST/PATCH: api.post(url, data)
      // DELETE: api.delete(url, config) -> We pass data in config.data

      let res;
      if (method === "delete") {
        res = await api.delete(route, { data: variables });
      } else {
        const methodFn = api[method] as (
          url: string,
          data: TParams,
        ) => Promise<{ data: TResponse }>;
        res = await methodFn(route, variables as TParams);
      }

      return res.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [route] });

      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    ...restOptions,
  });

  const isLoading = result.isPending;

  return { ...result, isLoading };
}
