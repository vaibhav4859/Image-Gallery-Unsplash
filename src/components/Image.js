import { Fragment, useEffect, useRef, useState } from "react";
import classes from './Image.module.css'
import { CardMedia, CardContent, IconButton, InputBase, useMediaQuery, Box } from '@mui/material';
import { Search } from "@mui/icons-material";
import axios from "axios";

const bgImage = "https://s3-alpha-sig.figma.com/img/e743/8927/0934542578d7a5804676ffdeb1326d02?Expires=1699228800&Signature=V1pj63JWwCIcZ54eTi0kqTNyZK03cLTXBlh-KsKSaoQ9tHBau0AeXL0r0mwg5NM9mRwkSJMiCa4NxOwUt3Wm7Dz1~H4~jYEuyiQdIEahDsWDH4GXUAA-EeMOB5MPcMxxAzpzwPutW~BafQ32-C0RYDf~5CtQh7Kam0pL5BQoToQeRkP~L6a1Xy7URJ6J6-fZH-ZyoA3Aiw~S-Lk3CMAI3lVNCvoE8NKufNZk~E5fPQauWBm5UGc1yGWHC1CIXPCzjViNWPOYLSrRfWsg3ikxaefNsfwiMj1q1jAkt6QTu8G-4D3yXTIgykGp9~7GPHLgbb6e2v3gMoc4w0ax7v5M4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

const Image = (props) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [scrollPosition, setScrollPosition] = useState(0); // state for showing search tags in screen display 
    const [enteredText, setEnteredText] = useState(""); // state for entered text in navbar searchbar according to which images will be shown from unspash api
    const [suggestions, setSuggestions] = useState([]); // state for suggestion tags accroding to images and searchText
    const listRef = useRef();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (enteredText.trim().length > 0) {
                const response = await axios.get(`https://api.unsplash.com/search/photos?query=${enteredText}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
                const suggestions = response.data.results.map((photo) => photo.alt_description);
                setSuggestions(suggestions);
            }
        }
        fetchSuggestions();
    }, [enteredText]); // to fetch suggestion tags from unspalsh search api accroding to searchText and images

    const handleScroll = (direction) => {
        const scrollAmount = 200;
        if (direction === 'right') listRef.current.scrollLeft += scrollAmount;
        else listRef.current.scrollLeft -= scrollAmount;
        setScrollPosition(listRef.current.scrollLeft);
    };

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
        <Fragment >
            {!props.searchText ? <CardContent sx={{ padding: "0px!important" }}>
                <div style={{ position: 'relative' }}>
                    <CardMedia component="img" image={bgImage} height="350rem" width="100%" />
                    <div className={classes.heading} style={{ fontSize: isNonMobileScreens ? "2rem" : "1.6rem", top: isNonMobileScreens ? "28%" : "18%" }}>Download High Quality Images by creators</div>
                    <p className={classes.heading2} style={{ fontSize: isNonMobileScreens ? "1rem" : "0.8rem" }}>Over 2.4 million+ stock Images by our talented community</p>
                    <form style={{ position: "" }} onSubmit={submitHandler}>
                        <Box sx={[styles.flexBetween, styles.inputContainer, { padding: isNonMobileScreens ? "0.1rem 1.5rem" : "0rem 0.2rem", width: isNonMobileScreens ? "60%!important" : "82%!important", left: isNonMobileScreens ? "20%" : "9%" }]} className={classes.search}>
                            <IconButton onClick={submitHandler}>
                                <Search />
                            </IconButton>
                            <InputBase value={enteredText} placeholder={isNonMobileScreens ? "Search high resolution Images, categories, wallpapers" : "Search high resolution Images"} fullWidth onChange={(e) => setEnteredText(e.target.value)} />
                        </Box>
                        {enteredText?.length > 0 && <Box className={classes.searchcontainer} sx={{ left: isNonMobileScreens ? "20%" : "9%", width: isNonMobileScreens ? "58.7%!important" : "66%!important" }}>
                            <ul style={{ listStyle: "none" }}>
                                {suggestions.splice(0, 5).map((suggestion, index) => {
                                    return <li key={index} className={classes.suggestion} onClick={() => changeHandler(suggestion)}>{isNonMobileScreens ? suggestion?.slice(0, 70) : suggestion?.slice(0, 23)} {suggestion?.length > (isNonMobileScreens ? 70 : 23) ? "..." : ""}</li>
                                })}
                            </ul>
                        </Box>}
                    </form>
                </div>
            </CardContent> :
                <div>
                    {/*Search Text with tags */}
                    <h1 className={classes.txt} style={{ color: props.mode === "dark" ? "#FFF" : "#4F4F4F" }}>{props.searchText}</h1>
                    <div className={classes.container}>
                        {scrollPosition > 0 && <button onClick={() => handleScroll('left')} className={classes.btn} style={{color: props.mode === "dark" ? "#E5E5E5" : "#4F4F4F"}}>&lt;</button>}
                        <ul className={classes.list} ref={listRef}>
                            {props.tags.map(item => {
                                return <li className={classes.tag} style={{color: props.mode === "dark" ? "#E5E5E5" : "#4F4F4F"}} onClick={() => changeHandler(item)}>{item}</li>
                            })}
                        </ul>
                        <button onClick={() => handleScroll('right')} className={classes.btn} style={{color: props.mode === "dark" ? "#E5E5E5" : "#4F4F4F"}}>&gt;</button>
                    </div>
                </div>}
        </Fragment >
    )
};

export default Image;

const styles = {
    flexBetween: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }, inputContainer: {
        backgroundColor: "#FFF",
        borderRadius: "9px",
        gap: "1rem",
        height: "17%",
        justifyContent: "center!important"
    }
}