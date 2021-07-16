import { addRow } from "./tbody";

const rendering = (data) => {
  data.forEach(item => addRow(item));
}

export default rendering;