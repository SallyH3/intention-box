import React, { useState, useEffect } from 'react';

import { Container, Grow, Grid } from '@material-ui/core';

import Form from '../Form/Form';
import NavBar from '../NavBar/NavBar';
import { fetchPosts } from '../../api/index';

const App = () => {
  const [posts, setPosts] = useState();

  const getPosts = async () => {
    const posts = await fetchPosts();
    setPosts(posts.data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container maxWidth="md">
      <NavBar />
      <Grow in>
        <Container>
          <Grid container alignItems="stretch" justify="space-between" spacing={3}>
            <Grid item xs={12} s={7}>
            </Grid>
            <Grid item xs={12} s={4}>
              <Form posts={posts} setPosts={setPosts} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
};

export default App;