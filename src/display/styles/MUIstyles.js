import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
    paddingTop: "80.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
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
  addButton: {
    padding: "1.5em",
    margin: "1em",
    marginTop: "auto",
    marginBot: "auto",
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
}));

export default useStyles;
