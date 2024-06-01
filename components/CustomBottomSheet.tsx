import React, { ReactNode, forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  children: React.ReactNode;
}

type Ref = BottomSheetModal;

export const CustomBottomSheet = forwardRef<Ref, Props>(
  ({ title, children }, ref) => {
    const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={1}
          appearsOnIndex={2}
        />
      ),
      []
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={2}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>{title}</Text>
          {children}
        </View>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#000000",
    marginBottom: 20,
  },
});
