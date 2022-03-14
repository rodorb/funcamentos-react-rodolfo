import { Fragment } from "react";

const Page = ({title, children})=>{
    return  (
        // componente de React agrupador, que no mete nada en el DOM
        // de forma que no rompe estilos, semántica, etc
        // es como el <ng-container> de angular
        <Fragment>
            <h2 className="layout-title bordered">{title}</h2>
            <section className="layout-content">{children}</section>
        </Fragment>
    )
}
//<Fragment></Fragment>
// es lo mismo que
// <></>
export default Page;