const express = require("express");
const book = require("../models/bookModel");

const bookroute = express.Router("/book");

bookroute.use(express.json());

bookroute.get("/", async (request, response) => {
    let data = await book.find({});
    return response.status(200).json({
        messege: "Connected to book route",
        data: data,
    });
});

bookroute.get("/:id", async (request, response) => {
    const id = request.params.id;
    try {
        const res = await book.findById(id);
        if (!res || res == {}) {
            return response.status(404).send({
                messege: "Could not find the record with id.",
            });
        }
        return response.status(200).json(res);
    } catch (error) {
        return response.status(500).send({
            message: "Failed to get id",
            ereor: error,
        });
    }
});

bookroute.post("/", async (request, response) => {
    let { title, author, year, publisher } = request.body;
    if (!title || !year || !publisher || !author) {
        return response.status(400).send({
            message: "provide all the values",
        });
    }
    try {
        const record = await book.create({
            title: title,
            author: author,
            year: year,
            publisher: publisher,
        });
        return response.status(201).send({
            messege: "Entry created succesfully",
        });
    } catch (error) {
        return response.status(400).send({
            messege: "Failed to create the recort",
            error: error,
        });
    }
});

bookroute.delete("/:id", async (request, response) => {
    let id = request.params.id;
    try {
        await book.deleteOne({ _id: id });
        return response.status(200).send({
            messege: "Deletion sucsesfull",
        });
    } catch (error) {
        return response.status(402).send({
            message: "Failed to delete the entry",
            error: error,
        });
    }
});

module.exports = bookroute;
