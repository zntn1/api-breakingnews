import userService from '../services/user.service.js'

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body

        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({ message: 'Submit all fields for registration' })
        }

        const user = await userService
            .createUserService(req.body)
            .catch((err) => console.log(err.message))

        if (!user) {
            return res.status(400).send({
                message: 'Error creating User'
            })
        }

        res.status(201).send({
            message: 'User created',
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllUserService()

        if (users.length === 0) {
            return res.status(400).send({ 
                message: 'There are no registered users' 
            })
        }

        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({ 
                message: 'Submit at least one field for update' 
            })
        }

        const { id, user } = req

        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        )

        return res.send({ message: 'User successfully updated!' })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { create, findAll, findById, update } 