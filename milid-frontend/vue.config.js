const prod = process.env.NODE_ENV === "production";
const github = process.env.NODE_ENV === "github";

module.exports = {
  publicPath : github? '/MILID': (prod? '/':'/')
}