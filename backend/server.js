require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ingredientRoutes = require('./routes/ingredientRouter');
const userRouter = require('./routes/userRouter');
const mealRouter = require('./routes/mealRouter');
const billRouter = require('./routes/billRouter');
const unitRouter = require('./routes/unitRouter');
const dispatchNoteRouter = require('./routes/dispatchNoteRouter');
const purchaseNoteRouter = require('./routes/purchaseNoteRouter');
const disposeNoteRouter = require('./routes/disposeNoteRouter');
const typeRouter = require('./routes/typeRouter');
const staffRouter = require('./routes/staffRouter');
PORT = process.env.PORT;

//express app
const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//routes
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/user', userRouter);
app.use('/api/meal', mealRouter);
app.use('/api/bill', billRouter);
app.use('/api/unit', unitRouter);
app.use('/api/dispatch-note', dispatchNoteRouter);
app.use('/api/purchase-note', purchaseNoteRouter);
app.use('/api/dispose-note', disposeNoteRouter);
app.use('/api/type', typeRouter);
app.use('/api/staff', staffRouter);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		//listen for request
		app.listen(PORT, () => {
			console.log('connected to db and listening on port ' + PORT);
		});
	})
	.catch((erorr) => {
		console.log(erorr);
	});
