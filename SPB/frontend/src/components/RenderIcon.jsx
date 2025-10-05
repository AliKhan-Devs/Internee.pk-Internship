import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";

const allIcons = { ...FaIcons, ...MdIcons, ...IoIcons };

function RenderIcon({ iconName, color,size, className }) {
  const Icon = allIcons[iconName];
  return Icon ? <Icon className={className} size={size || 36} style={{ color: color }}/> : null;
}

export default RenderIcon;