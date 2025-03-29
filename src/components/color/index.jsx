const palette = {
  light: {
    background: "#ffffff",
    text: "#000000",
    border: "1px solid rgba(0, 0, 0, 0.1)",

    card: {
      backgroundColor: "#f5f5f5",
    },

    paper: {
      backgroundColor: "#ffffff",
    },
    menuItem:{
      color:"#000000"
    },
    dialog: {
      title: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      },
      content: {
        backgroundColor: "#ffffff",
      },
      actions: {
        backgroundColor: "#ffffff",
      },
    },
    menu:{
      backgroundColor:"#F5F5F5"
    },
    disabledText: "#bbb", // Disabled buton rengi
    deleteButton: "#d32f2f", // Kırmızı buton
    closeButton: "#1976d2", // Mavi buton
  },

  dark: {
    background: "#1B4747",
    text: "#E0E0E0",
    border: "1px solid rgba(255, 255, 255, 0.1)",

    card: {
      backgroundColor: "#163B3B",
    },
    menuItem:{
      color:"#FFFFFF"
    },
    paper: {
      backgroundColor: "#121212",
    },

    dialog: {
      title: {
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "#121212",
      },
      content: {},
      actions: {
        backgroundColor: "#121212",
      },
    },
    menu:{
      backgroundColor:"#1B4747"
    },
    disabledText: "#888",
    deleteButton: "#b71c1c",
    closeButton: "#333333",
  },
};
export default palette;