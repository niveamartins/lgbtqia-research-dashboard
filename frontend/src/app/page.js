
'use client';

import styles from './page.module.css'
import { AppBar, Toolbar,  Typography, Select,  FormControl, InputLabel, MenuItem, Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(-1)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(-1)
  const [dataset, setDataset] = useState({})
  const [graphicData, setGData] = useState({});
  const [choosenGraphic, setChoosenGraphic] = useState(0)
  const [, setState] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8081/get/categories').then((res) => setCategories(res.data))
  }, [])

  useEffect(() => {
    if (selectedCategory > -1) {
        axios.get('http://127.0.0.1:8081/get-filtered/questions', 
        { params: {
          category_id: selectedCategory
        }}
      ).then((res) => setQuestions(res.data))
    }
  }, [selectedCategory])

  useEffect(() => {
    axios.get('http://127.0.0.1:8081/get/countries').then((res) => setCountries(res.data))
  }, [])

  useEffect(() => {
    if (selectedQuestion > -1 && selectedCountry > -1) {
        axios.get('http://127.0.0.1:8081/get-filtered/answerQuestions', 
        { params: {
          question_id: selectedQuestion,
          country_id: selectedCountry
        }}
      ).then((res) => {
        const graphics = {};

        const dataset = res.data;

        for (let item in dataset) {
          if(graphics[dataset[item].type_name] === undefined) {
            graphics[dataset[item].type_name] = {
              datasets: [
                {
                  label: '%',
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }
            graphics[dataset[item].type_name].labels = [dataset[item].answer]
            graphics[dataset[item].type_name].datasets[0].data = [dataset[item].percent]
          } else {
            graphics[dataset[item].type_name].labels.push(dataset[item].answer)
            graphics[dataset[item].type_name].datasets[0].data.push(dataset[item].percent)
          }
        }
        setGData(graphics[Object.keys(graphics)[choosenGraphic]])
        setDataset(graphics)
      })
    }
  }, [selectedCategory, selectedQuestion])

  return (
    <main className={styles.main}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LGBTQIA+ EUROPEAN RESEARCH DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>

      <div className={styles.selects}>
          <FormControl size='medium' fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              onChange={(e) => {
                setSelectedCategory(e.target.value)
              }}
              className={styles.inputSelect}
            >

              {categories.map((el) => {
                return <MenuItem value={el.category_id}>{el.category}</MenuItem>
              })}
            </Select>
          </FormControl>

          <FormControl size='medium' fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Country"
              onChange={(e) => {
                setSelectedCountry(e.target.value)
              }}
              className={styles.inputSelect}
            >

              {countries.map((el) => {
                return <MenuItem value={el.country_id}>{el.country_name}</MenuItem>
              })}
            </Select>
          </FormControl>

          {questions.length > 0 ?
          <FormControl size='medium' fullWidth>
            <InputLabel id="demo-simple-select-label">Question</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Question"
              onChange={(e) => {
                setSelectedQuestion(e.target.value)
              }}
              className={styles.inputSelect}
            >

              {questions.map((el) => {
                return <MenuItem value={el.question_id}>{el.question}</MenuItem>
              })}
            </Select>
          </FormControl> : ""}
        </div>
        {dataset[Object.keys(dataset)[choosenGraphic]] ? <div className={styles.graphicsPart}>
          <div className={styles.graphicElement}>
            <h3><Button
              disabled={choosenGraphic === 0}
              onClick={() => {
                setGData(dataset[Object.keys(dataset)[choosenGraphic - 1]])
                setChoosenGraphic(choosenGraphic - 1)
                setState((prev) => !prev)
              }}
              >{'<'}</Button>{Object.keys(dataset)[choosenGraphic]}<Button disabled={choosenGraphic === Object.keys(dataset).length - 1} onClick={() => {
                setGData(dataset[Object.keys(dataset)[choosenGraphic + 1]])
                setChoosenGraphic(choosenGraphic + 1)
                setState((prev) => !prev)
              }}>{'>'}</Button></h3>
              <div>
                { Object.keys(dataset)[choosenGraphic] &&
                <Pie datasetIdKey={Object.keys(dataset)[choosenGraphic]} updateMode='normal' redraw data={graphicData} />      
                }
              </div>
          </div>
        </div> : ""}

      </ThemeProvider>
    </main>
  )
}
