import express from "express";
import { getAllReviews, createReview } from "../Controllers/reviewController";
import { authenticate, restrict } from "./../auth/verifyToken";

const router = express.Router();
router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"], createReview));


  export default router