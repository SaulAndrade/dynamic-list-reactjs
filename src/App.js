import Questions from './containers/Questions/Questions'

import classes from './App.module.css'

function App() {
  return (
    <div style={{textAlign:'center'}}>
      <h1>Exemplo com 4 questões</h1>
      <div className={classes.DescBox}>
        
        <div className={classes.Question}>
          <h2>q1</h2>
          <div className={classes.Option}>a) -> q2</div>
          <div className={classes.Option}>b) -> q2</div>
          <div className={classes.Option}>c) -> q2</div>
        </div>

        <div className={classes.Question}>
          <h2>q2</h2>
          <div className={classes.Option}>a) -> q3</div>
          <div className={classes.Option}>b) -> q4</div>
        </div>

        <div className={classes.Question}>
          <h2>q3</h2>
          <div className={classes.Option}>a) -> fim</div>
          <div className={classes.Option}>b) -> q4</div>
        </div>

        <div className={classes.Question}>
          <h2>q4</h2>
          <div className={classes.Option}>a) -> fim</div>
          <div className={classes.Option}>b) -> fim</div>
          <div className={classes.Option}>c) -> fim</div>
          <div className={classes.Option}>d) -> fim</div>
        </div>

      </div>
      <Questions />
    </div>
  );
}

export default App;
