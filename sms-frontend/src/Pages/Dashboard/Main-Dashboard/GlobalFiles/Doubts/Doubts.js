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
import { axioss } from '../../../../../Redux/auth/action';
import { Grid, Modal, Box, TextareaAutosize } from '@mui/material'; // Import the Modal and Box components from Material-UI
import { useSelector } from 'react-redux';
const Doubts = ({ onNotify, open }) => {
  const [allDatas, setAllDatas] = useState([]);
  const [isModal1Open, setIsModal1Open] = useState(false); // Add a state for the modal
  const [isModal2Open, setIsModal2Open] = useState(false); // Add a state for the modal
  const [answerText, setAnswerText] = useState("");
  const [currentId, setCurrentId] = useState("");
  const { data } = useSelector((store) => store.auth)
  useEffect(() => {
    axioss.get("/general/showDoubts")
      .then((res) => setAllDatas(res.data));
  }, [open]);
  // Function to handle opening the modal
  const handleOpen1Modal = (id) => {
    setIsModal1Open(true);
    setCurrentId(id)
  };

  // Function to handle closing the modal
  const handleClose1Modal = () => {
    setIsModal1Open(false);
  };
  // Function to handle opening the modal
  const handleOpen2Modal = () => {
    setIsModal2Open(true);
  };

  // Function to handle closing the modal
  const handleClose2Modal = () => {
    setIsModal2Open(false);
  };


  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const dataToSend = {
      answer: answerText,
      userid: data?.user?._id,
      postid: currentId
    };
    axioss.post("/general/addAnswers", dataToSend)
      .then((res) => onNotify(res.status == 200 ? "success" : "error"))
    handleClose1Modal();
    setAnswerText('');
  }
  console.log(allDatas)
  return (

    <Grid container spacing={2}>
      {allDatas.map((data) => (
        <React.Fragment key={data.id}>
          <Grid item sm={12} md={6} lg={4} xl={3}>
            <Card elevation={6} sx={{ minHeight: 250, maxHeight: 250, maxWidth: 500, marginBottom: 5 }}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <Avatar src={`http://localhost:3001/uploads/${data.userId.image}`} alt="User Avatar" sx={{ marginRight: 2 }} />
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
                <IconButton color="primary" onClick={() => handleOpen1Modal(data._id)}>
                  <CommentOutlinedIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleOpen2Modal}>
                  <PreviewIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          {/* Modal 1*/}
          <Modal open={isModal1Open} onClose={handleClose1Modal}>
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
                <Button variant="contained" sx={{ bgcolor: 'darkblue' }} onClick={handleClose1Modal}>
                  Cancel
                </Button>
              </form>
            </Box>
          </Modal>
          {/* Modal 2*/}
          <Modal open={isModal2Open} onClose={handleClose2Modal}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxHeight: '80vh', overflowY: 'auto' }}>
              <Typography variant="h5">Answers</Typography>
              {allDatas.map((data) => (
                <React.Fragment key={data.id}>
                  {data.answers.map((res) => (
                    <Box key={res._id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                      <Avatar src={`http://localhost:3001/uploads/${data.userId.image}`} alt="User Avatar" sx={{ marginRight: 8 }} />
                      <div style={{ width: 500 }}>
                        <Typography variant="subtitle1">{res.userId}</Typography>
                        <Typography sx={{ width: '100%', wordWrap: 'break-word' }} variant="body1">{res.answer}</Typography>
                      </div>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button variant="outlined" color="primary" startIcon={<ThumbUpIcon />}>
                        {data.upvotes} Upvotes
                      </Button>
                    </Box>
                  ))}
                </React.Fragment>
              ))}
            </Box>
          </Modal>

        </React.Fragment>
      ))}
    </Grid>

  );
};

export default Doubts