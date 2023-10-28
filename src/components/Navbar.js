import { useState, useEffect } from "react";
import { Box, IconButton, InputBase, Typography, useMediaQuery } from "@mui/material";
import { Search, DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import classes from "./Navbar.module.css";
import axios from "axios";

const NavBar = (props) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // state for mobile and desktop navbar toogle
    const [enteredText, setEnteredText] = useState(""); // state for entered text in navbar searchbar according to which images will be shown from unspash api
    const [suggestions, setSuggestions] = useState([]); // state for suggestion tags accroding to images and searchText

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (enteredText.trim().length > 0) {
                const response = await axios.get(`https://api.unsplash.com/search/photos?query=${enteredText}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
                const suggestions = response.data.results.map((photo) => photo.alt_description);
                setSuggestions(suggestions);
            }
        }
        fetchSuggestions();
    }, [enteredText]); // to fetch suggestion tags from unspalsh search api accroding to searchText and images

    const submitHandler = (e) => {
        e.preventDefault();
        if (enteredText.trim().length > 0) {
            props.onChange(enteredText);
            setEnteredText("");
        }
    }

    const changeHandler = (suggestion) => {
        props.onChange(suggestion);
        setEnteredText("");
    }

    return (
        <Box sx={[{ backgroundColor: props.mode === "dark" ? "#232323" : "#FFF", }, styles.outermostContainer, styles.flexBetween]} >
            <Box sx={[styles.flexBetween, styles.innerContainer, { marginLeft: isNonMobileScreens ? "3.4rem" : "0.2rem", width: isNonMobileScreens ? "48%" : "86%" }]}>
                <Typography
                    className={classes.heading}
                    sx={[{ color: props.mode === "dark" ? "white" : "black", fontSize: isNonMobileScreens ? "clamp(1rem, 2rem, 2.25rem)" : "1.4rem", }, styles.logo]}
                    onClick={() => props.onChange("")}
                >
                    Image Gallery
                </Typography>
                <form onSubmit={submitHandler} style={{ backgroundColor: props.mode === "dark" ? "#4F4F4F" : "#FAFAFA", borderRadius: "9px", padding: "0.1rem 0.5rem", display: "flex", width: isNonMobileScreens ? "59.5%" : "100%" }}>
                    <IconButton onClick={submitHandler} >
                        <Search sx={{ color: `${props.mode === "dark" ? "white!important" : ""}` }} />
                    </IconButton>
                    {enteredText?.length > 0 && <Box className={classes.searchcontainer} sx={{ left: isNonMobileScreens ? "26%" : "35%", width: isNonMobileScreens ? "22.7%!important" : "34%!important" }}>
                        <ul style={{ listStyle: "none" }}>
                            {suggestions.splice(0, 5).map((suggestion, index) => {
                                return <li key={index} className={classes.suggestion} onClick={() => changeHandler(suggestion)}>{isNonMobileScreens ? suggestion?.slice(0, 38) : suggestion?.slice(0, 12)} {suggestion?.length > (isNonMobileScreens ? 38 : 12) ? "..." : ""}</li>
                            })}
                        </ul>
                    </Box>}
                    <InputBase value={enteredText} placeholder="Search..." sx={{ color: props.mode === "dark" ? "white" : "black" }} onChange={(e) => setEnteredText(e.target.value)} />
                </form>
            </Box>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? <Box sx={[styles.flexBetween, styles.desktopItemWrapper]}>
                <Typography sx={[{ color: props.mode === "dark" ? "white" : "black" }, styles.desktopNav]}>Explore</Typography>
                <Typography sx={[{ color: props.mode === "dark" ? "white" : "black" }, styles.desktopNav]}>Collection</Typography>
                <Typography sx={[{ color: props.mode === "dark" ? "white" : "black" }, styles.desktopNav]}>Community</Typography>
                <IconButton onClick={props.changeMode}>
                    {props.mode === "dark" ?
                        <DarkMode sx={[{ color: "white" }, styles.modeSwitch]} /> :
                        <LightMode sx={[{ color: "black" }, styles.modeSwitch]} />}
                </IconButton>
            </Box>
                : <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} sx={{ color: props.mode === "dark" ? "white!important" : "" }}>
                    <Menu />
                </IconButton>}

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && <Box sx={[{ color: "white!important", backgroundColor: props.mode === "dark" ? "#232323" : "white" }, styles.mobileOuterContainer]}>
                {/* CLOSE ICON */}
                <Box display="flex" justifyContent="flex-end" p="1rem" sx={{ color: "white!important" }}>
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Close sx={{ color: `${props.mode === "dark" ? "white" : "black"}` }} />
                    </IconButton>
                </Box>

                {/* MENU ITEMS */}
                <Box sx={[styles.flexBetween, styles.menuItemWrapper]}>
                    <Typography sx={[{ color: props.mode === "dark" ? "white" : "black" }, styles.mobileNav]}>Explore</Typography>
                    <Typography sx={[{ color: props.mode === "dark" ? "white" : "black" }, styles.mobileNav]}>Collection</Typography>
                    <Typography sx={[{ color: props.mode === "dark" ? "white" : "black" }, styles.mobileNav]}>Community</Typography>
                    <IconButton onClick={props.changeMode} sx={{ fontSize: "25px" }}>
                        {props.mode === "dark" ?
                            <DarkMode sx={[{ color: "white" }, styles.modeSwitch]} /> :
                            <LightMode sx={[{ color: "black" }, styles.modeSwitch]} />}
                    </IconButton>
                </Box>
            </Box>}
        </Box >
    );
};

export default NavBar;

const styles = {
    outermostContainer: {
        padding: "1rem 6%",
        position: "sticky",
        top: "0",
        left: "0",
        zIndex: "99",
    }, flexBetween: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }, innerContainer: {
        gap: "1.75rem",
    }, logo: {
        fontWeight: "400",
        "&:hover": {
            opacity: "0.4",
            cursor: "pointer",
        }
    }, desktopNav: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        "&:hover": {
            opacity: "0.4",
            cursor: "pointer",
        }
    }, modeSwitch: {
        fontSize: "25px",
        "&:hover": {
            opacity: "0.4",
            cursor: "pointer",
        }
    }, mobileOuterContainer: {
        position: "fixed",
        right: "0",
        bottom: "0",
        height: "100%",
        zIndex: "10",
        maxWidth: "500px",
        minWidth: "300px"
    }, mobileNav: {
        fontWeight: "bold",
        fontSize: "1.2rem",
        "&:hover": {
            opacity: "0.4",
            cursor: "pointer",
        }
    }, menuItemWrapper: {
        flexDirection: "column",
        gap: "3rem",
    }, desktopItemWrapper: {
        gap: "2rem",
        marginRight: "6rem",
    }
}