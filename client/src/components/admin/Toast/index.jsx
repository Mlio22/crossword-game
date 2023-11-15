import SuccessToast from "./SuccessToast";
import WarningToast from "./WarningToast";
import DangerToast from "./DangerToast";

export default function Toast({name, text}){
  // todo: tidak bisa toast yang sama
  if (name === 'success') return <SuccessToast text={text} />
  if (name === 'warning') return <WarningToast text={text} />
  if (name === 'danger') return <DangerToast text={text} />
}