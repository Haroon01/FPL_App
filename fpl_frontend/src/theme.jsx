import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors";

const offWhite = "#D3D3D3"
const darkPurple = "rgb(75, 3, 87)"
const lightPurple = "rgb(202, 7, 235)"
const offBlack = "#1f1f1f" // slightly lighter than black
const darkGreen = "rgb(24, 61, 61)" // same as bg colour
const lightGreen = "#44adad" // looks blue but is just darkGreen with a lighter shade

const theme = createTheme({
    palette: {
        primary: {
            main: offBlack,
            //secondary: "rgb(75, 3, 87)"
        },
        secondary: {
            main: lightGreen
        },
        text: {
            primary: offBlack
        },
        background: {
            primary: offBlack
        }
    },
    components: {
        MuiMenu:{
            styleOverrides: {
                paper: {
                    backgroundColor: offBlack,
                    color: offWhite
                }
            }
        },
        // MuiPaper: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: "rgb(4, 13, 18)",
        //             color: offWhite
        //         }
        //     }
        // },
        // MuiTextField: {
        //     styleOverrides: {
        //       root: {
        //         backgroundColor: 'transparent', // Keep default background color
        //       },
        //     },
        // }
        //   MuiButton: {
        //     styleOverrides: {
        //       root: {
        //         backgroundColor: "#f00a0a", // Set the text color to the default
        //       },
        //     },
        //   },
    }
    
})

export default theme;