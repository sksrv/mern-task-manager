import Task from "../models/Task.js";

//createTask
export const createTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            user: req.user.id
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//getALLTask
export const getTasks = async (req, res) => {
    try {
        //req.user.id comes from JWT middleware
        const tasks = await Task.find({ user: req.user.id });

        res.status(200).json({
            tasks
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//updateTask
export const updateTask = async (req, res) => {
    try {
        const { title, completed } = req.body;
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        //check task exist or not
        if (!task) {
            return res.status(404).json({ message: "Task not Found" });
        }
        //check ownership &  req.user.id we get from authMiddleware
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not Authorized" });
        }
        //update field
        if (title !== undefined) {
            task.title = title;
        }
        if (completed !== undefined) {
            task.completed = completed;
        }

        const updatedTask = await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
//deleteTask
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        //check task exist or not
        if (!task) {
            return res.status(404).json({ message: "Task not Found" });
        }
        //check ownership
        if(task.user.toString() !== req.user.id){
            return res.status(401).json({ message: "Not Authorized" });
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task deleted successfully"
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};