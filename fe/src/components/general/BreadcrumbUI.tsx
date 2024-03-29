import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { IBreadcrumb } from "../../models";
import { UtilsRoute } from "../../utils";

export function BreadcrumbUI() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb>();
  useEffect(() => {
    setBreadcrumbs(UtilsRoute.getBreadcrumbByRoute(location.pathname));
  }, [location]);

  return (
    <Breadcrumb className="pb-3">
      {breadcrumbs?.map((item: any, index: any) => {
        return (
          <Breadcrumb.Item key={index}>
            {item.path?.length! > 0 ? (
              <Link to={`${item.path}`}> {item.breadcrumbName}</Link>
            ) : (
              item.breadcrumbName
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
