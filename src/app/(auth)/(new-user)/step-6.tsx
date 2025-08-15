import ScreenWrapper from "@/src/components/ScreenWrapper";
import Select from "@/src/components/Select";
import StepContainer from "@/src/components/StepContainer";
import { ClanNode, ETHNICITIES } from "@/src/data/ClanTree";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function Step6() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();

   const [selectedEthnicity, setSelectedEthnicity] = useState<string>("");
   const [path, setPath] = useState<ClanNode[]>([]);
   const [options, setOptions] = useState<ClanNode[]>([]);

   // Select Ethnicity
   const handleEthnicitySelect = (ethnicity: string) => {
      const selected = ETHNICITIES.find((e) => e.id === ethnicity) as any;
      setSelectedEthnicity(ethnicity);
      setOptions(selected.clans);
      setPath([]);
   };

   console.log(
      "options clans",
      JSON.stringify(
         options.map((c) => c?.name),
         null,
         2
      )
   );

   // find the full object

   // Select Clan/Subclan
   // const handleSelect = (node: ClanNode) => {
   //    setPath([...path, node]);
   //    if (node.children && node.children.length > 0) {
   //       setOptions(node.children);
   //    } else {
   //       console.log(
   //          "✅ Final lineage:",
   //          [...path, node].map((n) => n.name)
   //       );
   //    }
   // };

   // Go Back
   // const handleBack = () => {
   //    if (path.length === 0) {
   //       // back to ethnicity screen
   //       setSelectedEthnicity(null);
   //       setOptions([]);
   //       return;
   //    }

   //    const newPath = [...path];
   //    newPath.pop();
   //    setPath(newPath);

   //    if (newPath.length === 0) {
   //       setOptions(selectedEthnicity?.clans || []);
   //    } else {
   //       const lastNode = newPath[newPath.length - 1];
   //       setOptions(lastNode.children || []);
   //    }
   // };

   return (
      <ScreenWrapper>
         <StepContainer heading="What is your linage" paragraph="Share your nationality and country of birth to help.">
            <>
               <Select
                  height={90}
                  options={ETHNICITIES.map((item) => item.id)}
                  searchable
                  placeholder="Ethnicity"
                  onSelect={(ethnicity) => {
                     updateField("ethnicity", ethnicity);
                     handleEthnicitySelect(ethnicity);
                  }}
                  error={!!errors.ethnicity}
                  errorMessage={errors.ethnicity}
               />
               {/* {
                  options.map((clan)=> <AppText>{clan.}</AppText>)
               } */}

               {/* <FlatList
                  data={ETHNICITIES}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                     <TouchableOpacity style={styles.listItem} onPress={() => handleEthnicitySelect(item)}>
                        <Text>{item.name}</Text>
                     </TouchableOpacity>
                  )}
               /> */}
            </>
            {/* {options.map((opt) => (
               // <TouchableOpacity key={opt.id} style={styles.optionBtn} onPress={() => handleSelect(opt)}>
               <AppText>{opt.name}</AppText>
               // </TouchableOpacity>
            ))} */}
            {/* {!selectedEthnicity ? (
               <AppText>hello</AppText>
            ) : (
               <> */}
            {/* <TouchableOpacity onPress={handleBack}> */}
            {/* <Text style={styles.backBtn}>◀ Back</Text> */}
            {/* </TouchableOpacity> */}

            {/* <Text style={styles.pathText}>Path: {path.map((p) => p.name).join(" → ")}</Text> */}

            {/* <View style={styles.optionsContainer}>
                  {options.map((opt) => (
                     // <TouchableOpacity key={opt.id} style={styles.optionBtn} onPress={() => handleSelect(opt)}>
                     <Text style={styles.optionText}>{opt.name}</Text>
                     // </TouchableOpacity>
                  ))}
               </View> */}
            {/* </> */}
            {/* )} */}
         </StepContainer>
      </ScreenWrapper>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, padding: 20 },
   title: { fontSize: 20, marginBottom: 10, fontWeight: "600" },
   listItem: {
      padding: 15,
      backgroundColor: "#f2f2f2",
      marginBottom: 10,
      borderRadius: 8,
   },
   listText: { fontSize: 18 },
   backBtn: { fontSize: 16, color: "blue", marginBottom: 10 },
   pathText: { marginBottom: 15, fontStyle: "italic" },
   optionsContainer: { gap: 10 },
   optionBtn: {
      padding: 15,
      backgroundColor: "#e0f7fa",
      borderRadius: 8,
      marginBottom: 10,
   },
   optionText: { fontSize: 18, textAlign: "center" },
});
