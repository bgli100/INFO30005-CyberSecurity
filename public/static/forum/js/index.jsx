import { renderRoutes } from "react-router-config";

export * from "./list";
export * from "./create";
export * from "./detail";

const Forums = (props) => {
  const { route } = props;

  return renderRoutes(route.routes, {
    someProp: "these extra props are optional",
  });
};

export default Forums;
