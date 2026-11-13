import express from "express";
import cors from "cors";
import { availabilityRouter } from "./routes/availability.js";
import { servicesRouter } from "./routes/services.js";
import { bookingsRouter } from "./routes/bookings.js";
import { errorHandler } from "./lib/errors.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/services", servicesRouter);
app.use("/bookings", bookingsRouter);
app.use("/availability", availabilityRouter);
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Bookly API on port ${PORT}`));