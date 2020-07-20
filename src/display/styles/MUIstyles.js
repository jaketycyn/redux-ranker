import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  addButton: {
    padding: "1.5em",
    margin: "1em",
    marginTop: "auto",
    marginBot: "auto",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  cardGridRoot: {
    flexGrow: 1,
  },
  card: {
    height: "22em",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(0.5),
    position: "relative",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  cardMedia: {
    // 16:9
    width: "100%",
    height: "100%",
  },
  cardContent: {
    flexGrow: 1,
    height: "80px",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    height: "60px",
    width: "100%",
    left: "0",
    bottom: "0",
    position: "fixed",
    // 2below center it
    display: "flex",
    justifyContent: "center",
  },

  rankingGrid: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: "100%",
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 500,
  },
  search: {
    textAlign: "center",
    // border: "1px solid grey",
    borderRadius: "5px",
    height: "20px",
    width: "100%",
    padding: "2px 23px 2px 30px",
    outline: 0,
  },
}));

export default useStyles;
