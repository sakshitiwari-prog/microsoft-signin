const Quote = require("../modals/quote-modal");
var jwt = require("jsonwebtoken");
const getAllQuote = async (req, res, next) => {
  // console.log(req.headers, "headers");
  const { userid } = req.headers;
  // console.log(userid, "userId");

  try {
    const existingUser = await Quote.findOne({ userId: userid });
    // console.log("existingUser", existingUser);
    if (!existingUser) {
      res.status(404).json({ message: "No Quotes Available" });
    } else {
      existingUser.quoteHistory.forEach((category) => {
        const keys = Object.keys(category);
        // console.log(keys, "---------");
        if (keys.length === 1) {
          const categoryName = keys[0];
          category[categoryName] = category[categoryName].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        }
      });
      res.status(200).json({ existingUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
var secretKey = "$wne7823@#$5nsjnd@@%%$#@#$";
function verifyToken(token) {
  try {
    // Verify the JWT signature
    const decoded = jwt.verify(token, secretKey);

    // Validate token claims (issuer, audience, etc.) if needed
    // Check expiration time
    if (decoded.exp < Date.now() / 1000) {
      throw new Error("Token expired");
    }

    // Optionally check token revocation

    return decoded;
  } catch (error) {
    // Token verification failed
    console.error("Token verification failed:", error.message);
    return null;
  }
}
const quoteCreation = async (req, res, next) => {
  const { userId, quoteCategory, quote } = req.body;

  try {
    const existingUser = await Quote.findOne({ userId: userId }).exec();
    // console.log("existingUser-before", existingUser);
    let updatedData;
    let currentData = {
      date: new Date().toString(),
      quote,
    };
    // console.log(currentData.date, "=================");
    let filter = { userId };
    async function putDataInDB() {
      if (existingUser.quoteHistory && existingUser.quoteHistory.length > 0) {
        const isCategoryExisting = existingUser.quoteHistory.some((item) =>
          Object.keys(item).includes(quoteCategory)
        );

        if (isCategoryExisting) {
          existingUser.quoteHistory.forEach((category) => {
            // console.log("category", category);
            const keys = Object.keys(category);
            const existingCategory = category[keys[0]];
            if (keys[0] == quoteCategory) {
              // console.log("currentData", currentData);
              existingCategory.push(currentData);
            }
          });
        } else {
          const categoryData = [currentData];
          const Newcategory = {
            [quoteCategory]: categoryData,
          };
          existingUser.quoteHistory.push(Newcategory);
        }
      } else {
        const categoryData = [currentData];
        const Newcategory = {
          [quoteCategory]: categoryData,
        };
        existingUser.quoteHistory.push(Newcategory);
      }
    }
    if (existingUser) {
      putDataInDB();
      updatedData = await Quote.findOneAndUpdate(
        filter,
        {
          quoteHistory: existingUser.quoteHistory,
        },
        {
          new: true,
        }
      );
      updatedData.save();
      res.status(200).json({ success: true });
    } else {
      let createUser = { userId, quoteHistory: [] };
      const categoryData = [currentData];
      const Newcategory = {
        [quoteCategory]: categoryData,
      };
      createUser.quoteHistory.push(Newcategory);
      Quote.create(createUser)
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log("inside createuser");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { quoteCreation, getAllQuote };
