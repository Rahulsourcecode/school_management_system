import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { axioss } from '../../../../Redux/auth/action';
import { Grid, Modal, Box, TextareaAutosize, Skeleton } from '@mui/material'; // Import the Modal and Box components from Material-UI
import { useSelector } from 'react-redux';

const Doubts = ({ onNotify, open }) => {
  const [allDatas, setAllDatas] = useState([]);
  const [modalStates, setModalStates] = useState({}); // State to manage the modal for each data item for CommentOutlinedIcon
  const [previewModalStates, setPreviewModalStates] = useState({}); // State to manage the modal for each data item for PreviewIcon
  const [answerText, setAnswerText] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [upvotes, setUpvotes] = useState(true)
  const { data } = useSelector((store) => store.auth);
  const postedBy = data.user.userType === "student" ? data?.user?.studentName : data?.user?.teacherName;
  const imageData = data?.user?.image;
  const userType = data?.user?.userType;
  const userId = data?.user?._id
  console.log(userId);
  useEffect(() => {
    axioss.get("/general/showDoubts").then((res) => setAllDatas(res.data));
  }, [open, modalStates, upvotes]);

  function upvotesAction(ansid) {
    setUpvotes((upvotes) => !upvotes)
    axioss.post("/general/upvotes", { ansid, userId })
  }

  // Function to handle opening the modal for a specific data item for CommentOutlinedIcon
  const handleOpenModal = (id) => {
    setModalStates((prev) => ({ ...prev, [id]: true }));
    setCurrentId(id);
  };

  // Function to handle closing the modal for a specific data item for CommentOutlinedIcon
  const handleCloseModal = () => {
    setModalStates({});
  };

  // Function to handle opening the modal for a specific data item for PreviewIcon
  const handleOpenPreviewModal = (id) => {
    setPreviewModalStates((prev) => ({ ...prev, [id]: true }));
  };

  // Function to handle closing the modal for a specific data item for PreviewIcon
  const handleClosePreviewModal = (id) => {
    setPreviewModalStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const dataToSend = {
      answer: answerText,
      userid: data?.user?._id,
      username: postedBy,
      img: imageData,
      userType: userType,
      postid: currentId,
    };
    axioss.post("/general/addAnswers", dataToSend).then((res) => onNotify(res.status == 200 ? "success" : "error"));
    handleCloseModal();
    setAnswerText('');
  };


  return (
    <Grid container spacing={2}>
      {allDatas.length ? (
        allDatas.map((data) => (
          <React.Fragment key={data.id}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card elevation={6} sx={{ minHeight: 250, maxHeight: 250, maxWidth:280, marginBottom: 5 }}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <Avatar src={`https://www.app.menintown.shop/uploads/${data.userId.image}`} alt="User Avatar" sx={{ marginRight: 2 }} />
                    <Typography variant="h6">{data.userId.studentName}</Typography>
                  </div>
                  <Typography variant="h5" gutterBottom>
                    {data.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {data.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div style={{ flexGrow: 1 }}></div>
                  <IconButton color="primary" onClick={() => handleOpenModal(data._id)}>
                    <CommentOutlinedIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleOpenPreviewModal(data._id)}>
                    <PreviewIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          {[1, 1, 1, 1].map(() => <Skeleton variant="rectangular" width={210} height={200} sx={{ marginBottom: 5, marginLeft: 10 }} />)}
          {[1, 1, 1, 1].map(() => <Skeleton variant="rectangular" width={210} height={200} sx={{ marginBottom: 5, marginLeft: 10 }} />)}
        </React.Fragment>
      )}

      {/* Modal 1 */}
      {allDatas.map((data) => (
        <Modal key={data._id} open={modalStates[data._id]} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Box>
              <label style={{ fontWeight: 600 }}>title:</label>
              <Typography gutterBottom sx={{ width: '100%', wordWrap: 'break-word' }}>{data.title}</Typography>
              <label style={{ fontWeight: 600 }}>description:</label>
              <Typography gutterBottom sx={{ width: '100%', wordWrap: 'break-word' }}>{data.description}</Typography>
            </Box>
            <Typography variant="h6">Type you answer</Typography>
            <form onSubmit={handleSubmitAnswer}>
              <TextareaAutosize
                name="answer"
                value={answerText}
                onChange={handleAnswerChange}
                rows={4}
                placeholder="Type your answer here..."
                style={{ width: '100%', marginBottom: 8 }}
              />
              <Button variant="contained" sx={{ bgcolor: 'darkblue', marginRight: 1 }} type="submit">
                Submit Answer
              </Button>
              <Button variant="contained" sx={{ bgcolor: 'darkblue' }} onClick={handleCloseModal}>
                Cancel
              </Button>
            </form>
          </Box>
        </Modal>
      ))}
      {/* Modal 2 */}
      {allDatas.map((data) => (
        <Modal key={data._id} open={previewModalStates[data._id]} onClose={() => handleClosePreviewModal(data._id)}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxHeight: '80vh', overflowY: 'auto' }}>
            <Typography variant="h5">Answers</Typography>
            {data.answers.length === 0 ? (
              <Typography variant="body1">0 answers</Typography>
            ) : (
              data.answers.map((res) => (
                <Box key={res._id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <Avatar src={`https://www.app.menintown.shop/uploads/${res.img}`} alt="User Avatar" sx={{ marginRight: 8 }} />
                  <div style={{ width: 500 }}>
                    <Typography variant="subtitle1">{`${res.username} (${res.userType})`}</Typography>
                    <Typography sx={{ width: '100%', wordWrap: 'break-word' }} variant="body1">{res.answer}</Typography>
                  </div>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button variant="outlined" color="primary" onClick={() => upvotesAction(res._id)} startIcon={<ThumbUpIcon />}>
                    {res.upvotes.length} Upvotes
                  </Button>
                </Box>
              ))
            )}
          </Box>
        </Modal>
      ))}
    </Grid>
  );
};

export default Doubts;
