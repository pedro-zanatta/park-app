import { TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const HeaderBackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={{ marginLeft: 16 }}>
      <FontAwesome5 name="arrow-left" size={20} color="white" solid />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
