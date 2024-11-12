import * as React from "react";
import {useState} from "react";
import Svg, {Path} from "react-native-svg";

type ComputerSVGProps = {
   status: boolean;
};

const ComputerSVG = ({status}: ComputerSVGProps) => {

   return (
      <Svg viewBox="0 0 128 128" height={80} width={80}>
         <Path
            fill="#9aa6ac"
            d="M104 0H24C10.746 0 0 10.742 0 24v48c0 13.258 10.746 24 24 24h24c0 4.414-3.59 8-8 8h-4c-6.629 0-12 5.375-12 12s5.371 12 12 12h56c6.629 0 12-5.375 12-12s-5.371-12-12-12h-4c-4.41 0-8-3.586-8-8h24c13.254 0 24-10.742 24-24V24c0-13.258-10.746-24-24-24zM88 112h4c2.207 0 4 1.797 4 4s-1.793 4-4 4H36c-2.207 0-4-1.797-4-4s1.793-4 4-4h4c8.836 0 16-7.164 16-16h16c0 8.836 7.164 16 16 16zm32-40c0 8.82-7.176 16-16 16H24c-8.824 0-16-7.18-16-16V24c0-8.82 7.176-16 16-16h80c8.824 0 16 7.18 16 16v48z"
         />
         <Path
            fill={status ? "#54d100" : "#e63737"}
            d="M104 24v48H24V24h80m0-8H24c-4.418 0-8 3.578-8 8v48c0 4.422 3.582 8 8 8h80c4.418 0 8-3.578 8-8V24c0-4.422-3.582-8-8-8z"
         />
      </Svg>
   );
};

export default ComputerSVG;
