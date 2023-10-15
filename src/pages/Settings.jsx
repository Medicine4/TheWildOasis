import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";

function Settings() {
  return (
    <Row>
      <Heading as="h1">更新酒店设置</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
