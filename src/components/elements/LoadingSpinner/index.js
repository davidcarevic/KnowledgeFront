import React from "react";
import { css } from "@emotion/core";
import {MoonLoader} from "react-spinners";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

 const LoadingSpinner=(props)=> <MoonLoader
    css={override}
    size={150}
    //size={"150px"} this also works
    color={"black"}
    loading={props.isLoading}/>

    export default LoadingSpinner