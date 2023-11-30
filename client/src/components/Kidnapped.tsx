import { useEffect } from "react";

const Kidnapped = () => {
  
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://bringthemhomenow.net/1.0.8/hostages-ticker.js";
    script.setAttribute(
      "integrity",
      "sha384-jQVW0E+wZK5Rv1fyN+b89m7cYY8txH4s3uShzHf1T51hdBTPo7yKL6Yizgr+Gp8C"
    );
    script.setAttribute("crossorigin", "anonymous");
    document.getElementsByTagName("head")[0].appendChild(script);
    return () => {
      // Cleanup script on component unmount
      document.getElementsByTagName("head")[0].removeChild(script);
    };
  }, []);
  return <div id="bthn" lang="en"></div>;
};
export default Kidnapped;
