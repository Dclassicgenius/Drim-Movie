// import { useFloating, shift, offset, flip } from "@floating-ui/react";
// const [arrowDirection, setArrowDirection] = useState("up");
// import { ModifierArguments, Modifier, ModifierPhases } from "@popperjs/core";

// export function ToolTip() {
//   return <>

//   // onCreate={updateArrowDirection}
//                 // onShow={updateArrowDirection}
//                 visible={selectedItemId === credit.id}
//                 onClickOutside={() => setSelectedItemId(null)}
//                 arrow={true}
//                 interactive={true}
//                 content={
//                   <div>
//                     <DetailPopUp credit={credit}></DetailPopUp>
//                   </div>
//                 }
//                 inlinePositioning={true}
//   </>;
// }

// const sameWidth: Partial<Modifier<"sameWidth", {}>> = {
//     name: "sameWidth",
//     enabled: true,
//     phase: "beforeWrite" as ModifierPhases,
//     requires: ["computeStyles"],
//     fn: ({ state }: ModifierArguments<{}>) => {
//       state.styles.popper.width = `${state.rects.reference.width}px`;
//     },
//     effect: ({ state }: ModifierArguments<{}>) => {
//       state.elements.popper.style.width = `${
//         (state.elements.reference as HTMLElement).offsetWidth
//       }px`;
//     },
//   };

//   const Arrow = () => (
//     <div
//       className="w-2 h-2 bg-[#032541] transform rotate-45"
//       data-popper-arrow
//     ></div>
//   );
//   //

//   function updateArrowDirection(instance: any) {
//     const placement = instance.props.placement;
//     if (placement.startsWith("top")) {
//       setArrowDirection("down");
//     } else if (placement.startsWith("bottom")) {
//       setArrowDirection("up");
//     }
//   }
