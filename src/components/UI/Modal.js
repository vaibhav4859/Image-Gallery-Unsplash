import { useState, useEffect } from 'react';
import { Box, Button, CardMedia, Modal, useMediaQuery } from "@mui/material";
import classes from './Modal.module.css';
import Insta from './svg/Insta';
import Twitter from './svg/Twitter';
import Like from './svg/Like';
import Share from './svg/Share';
import Info from './svg/Info';
import axios from 'axios';

const PopUpModal = (props) => {
  const [imageData, setImageData] = useState([]); // state to store data of particular image which has been clicked for pop up modal
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(`https://api.unsplash.com/photos/${props.content?.id}?client_id=${process.env.REACT_APP_ACCESS_KEY}`)
      const data = await response.data;
      setImageData(data);
    }
    fetchImages();
  }, [props.content?.id]); // to fetch data from unsplash api of a particular image

  return (
    <div>
      <Modal open={props.openModals} onClose={() => props.setOpenModals((prev) => !prev)} sx={{ width: "100%!important" }}>
        <Box sx={{ backgroundColor: props.mode === "dark" ? "#232323" : "#FFF", width: isNonMobileScreens ? "60%" : "75%", height: isNonMobileScreens ? "90%" : "80%" }} className={classes.maincontainer}>
          <div style={{ position: 'relative' }} >
            <CardMedia component="img" image={imageData?.urls?.small} height="350rem" width="100%" />
            <Button size='small' className={classes.sharebtn} variant='outlined' sx={{ left: isNonMobileScreens ? "3%" : "44%" }}>
              <Share />
              <span>Share</span>
            </Button>
            <Button size='small' className={classes.infobtn} variant='outlined' sx={{ left: isNonMobileScreens ? "17%" : "71%" }}>
              <Info />
              <span>Info</span>
            </Button>
            <Button size='medium' className={classes.downloadbtn} variant='outlined' sx={{ bottom: isNonMobileScreens ? "5%" : "17%", width: isNonMobileScreens ? "20%" : "53%!important" }}>
              <a className={classes.download} target='_blank' rel="noreferrer" href={`${imageData?.links?.download}`}>Download Image</a>
            </Button>
          </div>
          <Box sx={[{ justifyContent: isNonMobileScreens ? "space-between" : "", flexDirection: isNonMobileScreens ? "row" : "row" }, styles.outermostBox]}>
            <Box sx={[{ flexDirection: isNonMobileScreens ? "row" : "column", alignItems: isNonMobileScreens ? "" : "flex-start" }, styles.outerBox]}>
              <Box display={isNonMobileScreens ? "" : "flex"} >
                <Box display="flex">
                  <Box className={classes.center}>
                    <img src={imageData?.user?.profile_image?.small} className={classes.userPhoto} alt="img" />
                  </Box>
                  <Box paddingLeft="0.5rem" display={isNonMobileScreens ? "" : "flex"}>
                    <Box>
                      <p className={classes.name} style={{ color: `${props.mode === "dark" ? "#E5E5E5" : "#4F4F4F"}` }} >{`${imageData?.user?.first_name ? imageData?.user?.first_name : ""} ${imageData?.user?.last_name ? imageData?.user?.last_name : ""}`}</p>
                      {imageData?.user?.username && <a href={`https://unsplash.com/@${imageData?.user?.username}`} rel="noreferrer" target='_blank' className={classes.username}>@{imageData?.user?.username}</a>}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={`${classes.center} ${classes.handles}`} sx={{ paddingLeft: isNonMobileScreens ? "1rem" : 0, paddingTop: isNonMobileScreens ? "" : "0.5rem", flexDirection: isNonMobileScreens ? "" : "column", alignItems: isNonMobileScreens ? "center" : "flex-start" }} >
                {props.content?.user?.instagram_username && <div className={classes.center}>
                  <Insta />
                  <a target='_blank' rel="noreferrer" href={`https://www.instagram.com/${props.content?.user?.instagram_username}`} className={classes.insta}>/{props.content?.user?.instagram_username}</a>
                </div>}
                {props.content?.user?.twitter_username && <div className={classes.center}>
                  <Twitter />
                  <a className={classes.twitter} href={`https://twitter.com/${props.content?.user?.twitter_username}`} rel="noreferrer" target='_blank'>/{props.content?.user?.twitter_username}</a>
                </div>}
              </Box>
            </Box>
            <Box className={classes.center} flexDirection={isNonMobileScreens ? "" : "column"}>
              <p className={classes.downloadcount} style={{ paddingRight: isNonMobileScreens ? "1rem" : "0", fontSize: isNonMobileScreens ? "0.9rem" : "0.83rem", marginBottom: isNonMobileScreens ? "" : "1rem" }}>{`${imageData?.downloads ? (imageData?.downloads > 1000 ? `${(imageData?.downloads / 1000).toFixed(1)}k` : imageData?.downloads) : ""}`} downloads</p>
              <div className={classes.center}>
                <Like />
                <p className={classes.likeCount}>{`${imageData?.likes ? (imageData?.likes > 1000 ? `${(imageData?.likes / 1000).toFixed(1)}k` : imageData?.likes) : ""}`}</p>
              </div>
            </Box>
          </Box>
          <Box sx={{ padding: "0 1.2rem" }}>
            <p className={classes.tagHeading} style={{ color: `${props.mode === "dark" ? "#E5E5E5" : "#4F4F4F"}` }} >Related Tags</p>
            <ul className={classes.list}>
              {imageData?.tags?.slice(0, isNonMobileScreens ? 10 : 2).map((item, index) => {
                return <li className={classes.tag} key={index} onClick={() => {
                  props.onChange(item.title);
                  props.setOpenModals((prev) => !prev);
                }}>{item.title}</li>
              })}
            </ul>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PopUpModal;

const styles = {
  outermostBox: {
    padding: "0.8rem 1.2rem",
    display: "flex"
  }, outerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  }, innerBox: {
  }
}
