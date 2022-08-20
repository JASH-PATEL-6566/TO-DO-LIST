const State = require('../models/state');
const List = require('../models/list');
// const ToDo = require('../models/todo');

module.exports = {
    async fetching(req, res) {
        const state = await State.find({})
        // active component
        const active = state[0].active;
        // console.log(active);

        // List 
        const list = await List.find({});

        // active todo list
        const activeList = await List.find({ _id: active });
        const todos = [];

        if (activeList && active && activeList[0].toDos) {
            activeList[0].toDos.map((item) => {
                todos.push(item);
            })
        }

        // console.log(todos);
        res.send({ active: active, list: list, activeList: activeList[0], todos })
    },

    mutation(req, res) {
        const { message } = req.body;

        // ADD LIST
        if (message === 'ADD_LIST') {
            const { name } = req.body;

            State.count()
                .then((count) => {
                    List.find({ name: name })
                        .then((result) => {
                            if (result.length) {
                                res.send({ message: 'List is already present....' })
                            }
                            else {
                                const list = new List({
                                    name
                                })
                                const { _id } = list;
                                if (count === 0) {
                                    const state = new State({
                                        active: _id,
                                        list: [_id]
                                    })
                                    Promise.all([list.save(), state.save()])
                                        .then(() => res.send({ message: 'Added' }));
                                }
                                else {

                                    State.update({ $push: { list: _id }, $set: { active: _id } }, function (err, result) {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            // console.log("Result :", result)
                                        }
                                    })


                                    list.save()
                                        .then(() => res.send({ message: 'list is successfuly added..' }))
                                }
                            }
                        })

                })
        }

        // Remove List
        if (message === 'DELETE_LIST') {
            const { id } = req.body;

            List.deleteOne({ _id: id }, function (err) {
                // console.log('deleting List');
                if (err)
                    throw err;

                State.update({}, { $pull: { list: { $in: id } } }, function (err) {
                    if (err)
                        throw err;

                    List.findOne({}, function (err, item) {
                        if (err)
                            throw err;

                        let newActive;
                        if (item) {
                            newActive = item._id;
                        }
                        else {
                            newActive = null;
                        }

                        State.update({ $set: { active: newActive } })
                            .then(() => res.json({ success: true, message: "Deleted" }))
                    });
                });
            });
        }

        // Change active
        if (message === 'CHANGE_ACTIVE') {
            const { id } = req.body;

            State.update({ $set: { active: id } })
                .then(() => res.send({ message: 'active change' }))
        }

        // Add ToDo in active List

        if (message === 'ADD_TODO') {
            const { id, name, active } = req.body;

            List.find({ _id: active })
                .then(item => {
                    item[0].update({ $push: { toDos: { _id: id, name: name } } }, function (err, result) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send('done')
                        }
                    })
                })
        }

        // Delete Todo
        if (message === 'DELETE_TODO') {
            const { id, active } = req.body;

            // List.find({ _id: active })
            //     .then(list => {

            //     })
            List.update({ _id: active }, { "$pull": { "toDos": { "_id": id } } }, { safe: true, multi: true }, function (err, obj) {
                if (err) {
                    throw err;
                }
                res.send(obj);
            });


        }
    }
}