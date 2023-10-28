import { useState, useEffect } from 'react';
import { useMediaQuery, ImageList, Box, ImageListItem } from '@mui/material';
import classes from './ImageLists.module.css';
import PopUpModal from './UI/Modal';
import axios from 'axios';
import DarkModeLike from './UI/svg/DarkModeLike';
import LightModeLike from './UI/svg/LightModeLike';

const ImageLists = (props) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [images, setImages] = useState([]); // state that will contain images to be shown according to searchText
    const [openModals, setOpenModals] = useState(Array(images.length.length).fill(false)); // state to check which modal to be openend for particular image

    useEffect(() => {
        const fetchImages = async () => {
            let response;
            if (props.searchText === "") response = await axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}`);
            else response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=1&query=${props.searchText}`);
            const data = await response.data;
            if (props.searchText === "") setImages(data);
            else {
                setImages(data.results);
                let tags = [];
                data.results.map(item => {
                    for (let key of item.tags) tags.push(key.title);
                });
                props.tagHandler(tags);
            }
        }
        fetchImages();
    }, [props.searchText]); // to fetch images and tags from unspalsh search api accroding to searchText


    const handleOpenModal = (index) => {
        const updatedModals = [...openModals];
        updatedModals[index] = true;
        setOpenModals(updatedModals);
    };

    const handleCloseModal = (index) => {
        const updatedModals = [...openModals];
        updatedModals[index] = false;
        setOpenModals(updatedModals);
    };
    
    return (
        <Box sx={{ width: "80%", margin: "2rem auto", backgroundColor: "transparent" }} >
            <ImageList variant="masonry" cols={isNonMobileScreens ? 3 : 2} gap={8}>
                {images?.map((item, index) => (
                    <ImageListItem key={index} sx={[{ backgroundColor: props.mode === "dark" ? "#141414" : "#FFF" }, styles.imageList]}>
                        <img src={item.urls.small} alt={"unsplash"} loading="lazy" className={classes.image} onClick={() => handleOpenModal(index)} width={isNonMobileScreens ? "auto" : "2rem"} />
                        <Box sx={[styles.outermostBox, { padding: isNonMobileScreens ? "0.7rem 1rem" : "0.3rem 0.5rem" }]} onClick={() => handleOpenModal(index)}>
                            <img src={item.user.profile_image.small} alt={item.user.first_name} style={{ borderRadius: "50%", width: `${isNonMobileScreens ? "" : "1.8rem"}` }} />
                            <Box sx={styles.outerBox} >
                                <Box sx={{ paddingLeft: isNonMobileScreens ? "1rem" : "0.3rem" }}>
                                    {item.user.first_name && <p className={classes.name} style={{ color: props.mode === "dark" ? "white!important" : "#4F4F4F"}} >{`${item.user.first_name?.slice(0, 8)} ${isNonMobileScreens && item.user.last_name ? item.user.last_name : ""}`}</p>}
                                    {item.user.username && <a className={classes.username} href={`https://unsplash.com/@${item.user.username}`} target='_blank' rel="noreferrer">{`@${isNonMobileScreens ? item.user.username : item.user.username?.slice(0, 6)}`}</a>}
                                </Box>
                                <Box sx={styles.innerBox}>
                                    {props.mode === "dark" ? <DarkModeLike isNonMobileScreens={isNonMobileScreens} /> : <LightModeLike isNonMobileScreens={isNonMobileScreens} />}
                                    <p className={classes.likes} style={{ color: props.mode === "dark" ? "#E5E5E5" : "#4F4F4F", fontSize: isNonMobileScreens ? "1rem" : "0.6rem" }} position="below" >{`${item.likes ? (item.likes > 1000 ? `${(item.likes / 1000).toFixed(1)}k` : item.likes) : ""}`}</p>
                                </Box>
                            </Box>
                        </Box>
                        {/* Pop-up for images */}
                        {openModals[index] && <PopUpModal openModals={openModals[index]} setOpenModals={() => handleCloseModal(index)} content={item} mode={props.mode} onChange={props.onChange} />}
                    </ImageListItem>
                ))}
            </ImageList>
        </Box >
    );
}

export default ImageLists;

const styles = {
    imageList: {
        boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.06)",
        marginBottom: "1.5rem!important",
        borderRadius: "0rem 0rem 0.5rem 0.5rem"
    }, outermostBox: {
        display: "flex",
        alignItems: "center"
    }, outerBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    }, innerBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}