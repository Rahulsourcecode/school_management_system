import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { axioss } from '../../../../../Redux/auth/action';
import { Grid, Paper } from '@mui/material';
const Doubts = () => {
  const [allDatas, setAllDatas] = useState([])
  useEffect(() => {
    axioss.get("/general/showDoubts")
      .then((res) => setAllDatas(res.data))
  }, [])
  return (
    <Grid container spacing={2}>
      {allDatas.map((data) => {
        return <>
          <Grid item sm={12} md={6} lg={4} xl={3}>
            <Card elevation={6} sx={{ maxWidth: 500, marginBottom: 5 }}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <Avatar src="/path_to_user_avatar.jpg" alt="User Avatar" sx={{ marginRight: 8 }} />
                  <Typography variant="h6">{data._id}</Typography>
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
                <IconButton color="primary">
                  <CommentOutlinedIcon />
                </IconButton>
              </CardActions>
              {/* Comment section can be added here */}
              {/* You can use another Card or List component to represent comments */}
              {/* For brevity, I'm skipping the comment section in this example */}
            </Card>
          </Grid>
        </>
      }
      )}

    </Grid>
  );
};

export default Doubts;
