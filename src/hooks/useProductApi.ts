import { FeedProduct } from "@/components/Feed/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { Product, ProductInput, ProductMediaInput, ProductMediaTable } from "../../types/supabaseTypes";
import { useApiMutation, useApiQuery } from "./useApi";


type FeedEnvelope = {
  data: FeedProduct;
  nextCursor: string | null;
};

type CursorPage<T> = { data: T[]; nextCursor: string | null };

  type AddMediaPayload = {
  images: Array<{
    url: string;
    mimeType?: string;
    sizeBytes?: number;
    width?: number | null;
    height?: number | null;
  }>;
};


export class ProductApi {

  static useGetProductById = (productId: string|null) => {
    const { session } = useAuthStore();
    const accessToken = session?.accessToken; 
    const { data, isLoading, error, isFetching, refetch, }= useApiQuery<FeedEnvelope>(`/product/${productId}`,{enabled: !!accessToken}
    );
    return { isLoading, data, error, isFetching, refetch, };
  };

  static useCreateProduct =  () => {
    const qc = useQueryClient();
      return useApiMutation<ProductInput>('post', "/product", {
        onSuccess: res => {
          const newProduct = res;
          qc.setQueryData<CursorPage<ProductInput>>(["/feed"], old => {
            if (!old) return { data: [newProduct], nextCursor: null };
            return {
              ...old,
              data: [newProduct, ...(old.data ?? [])]
            };
          });
          qc.invalidateQueries({ queryKey: ["/feed"] });
        }
      });
  };

  static useGetProductFeed = ()=>{
    const { session } = useAuthStore();
    const accessToken = session?.accessToken; 

     const { data, isLoading, error, isFetching, refetch, } = useApiQuery<FeedEnvelope>(
        '/product/feed',
      undefined,
        {
          enabled: !!accessToken,
        }
      );
      return{data,isLoading,error,isFetching,refetch}
  }

  static useDeleteProduct=  (productId: string|null) => {
    const qc = useQueryClient();
      return useApiMutation<{ message: string }, void>(
        "delete",
        `/product/${productId}`,
        {
          onSuccess: () => {
            qc.setQueryData<CursorPage<Product>>(["/feed"], old => {
              if (!old?.data) return old;
              return { ...old, data: old.data.filter(p => p.id !== productId) };
            });

            qc.invalidateQueries({ queryKey: ["/feed"] });
          }
        }
      );
  };

  // 1) PATCH product content
  static useUpdateProductContent = (productId: string) =>
    useApiMutation<ProductInput,Partial<ProductInput>>(
      "patch",
      `/product/${productId}`
    );

// 2) POST media (add new images after upload)
  static useAddProductMedia = (productId: string) =>
    useApiMutation<ProductMediaInput[], AddMediaPayload>(
      "post",
      `/product/${productId}/media`
    );

  static useGetProductMediaById = (productId:string)=>{
    const { session } = useAuthStore();
    const accessToken = session?.accessToken; 
    const { data, isLoading,  refetch, error , isFetching}= useApiQuery<ProductMediaTable[]>(`/product/${productId}/media`,undefined,{enabled:!!accessToken && !!productId});
    return{data,isLoading, refetch, error, isFetching}
  }
}
 