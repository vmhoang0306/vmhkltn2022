import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { IBreadcrumb } from "../../models/breadcrumb";
import { UtilsRoute } from "../../utils/route";

export function BreadcrumbUI() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb>();
  useEffect(() => {
    setBreadcrumbs(UtilsRoute.getBreadcrumbByRoute(location.pathname));
  }, [location]);

  return (
    <Breadcrumb className="pt-3" style={{ paddingLeft: '35px' }}>
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
