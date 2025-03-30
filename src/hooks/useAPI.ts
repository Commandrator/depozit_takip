const returnSeverity = (status: number): 'error' | 'warning' | 'info' | 'success' => {
  switch (status) {
    case 400:
      return "warning";
    case 500:
      return "error";
    default:
      return "error";  // Default da 'error' dönüyor
  }
};
export default returnSeverity;