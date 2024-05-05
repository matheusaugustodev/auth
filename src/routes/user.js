const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../config/db')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {

        const { email, name, password } = req.body

        if (!email || !name || !password) throw 'Dados insuficientes'
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) throw 'Email inválido'
        if (password.length < 6) throw 'Senha deve ter pelo menos 6 caracteres'
        if (name.length < 3) throw 'Nome deve ter pelo menos 3 caracteres'
        if (name.match(/[0-9]/)) throw 'Nome não pode ter números'

        const resultaBuscaPorEmail = await db.query(`SELECT * FROM users WHERE email = '${email}'`)
        if (resultaBuscaPorEmail.rows.length > 0) throw 'Email já cadastrado'

        const passwordHash = await bcrypt.hash(password, 10)
        const resultadoCriacao = await db.query(`INSERT INTO users (email, name, password) VALUES ('${email}', '${name}', '${passwordHash}') RETURNING *`)
        const user = resultadoCriacao && resultadoCriacao.rows && resultadoCriacao.rows.length > 0 ? resultadoCriacao.rows[0] : null

        if (!user) throw 'Erro ao criar usuário'

        res.status(201).json({ ok: 'ok', message: 'Usuário criado com sucesso', user })        

    } catch (err) {
        return res.status(400).send({ error: 'Falha no registro', message: err })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) throw 'Dados insuficientes'
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) throw 'Informações inválidas'
        if (password.length < 6) throw 'Senha deve ter pelo menos 6 caracteres'

        const resultaBuscaPorEmail = await db.query(`SELECT * FROM users WHERE email = '${email}'`)
        const user = resultaBuscaPorEmail && resultaBuscaPorEmail.rows && resultaBuscaPorEmail.rows.length > 0 ? resultaBuscaPorEmail.rows[0] : null
        if (!user) throw 'Informações inválidas'

        if (!await bcrypt.compare(password, user.password)) throw 'Informações inválidas'

        res.status(200).json({ ok: 'ok', message: 'Usuário logado com sucesso'})
    } catch (err) {
        return res.status(400).send({ error: 'Falha na autenticação', message: err })
    }
})

module.exports = router