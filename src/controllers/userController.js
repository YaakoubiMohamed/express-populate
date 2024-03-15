const user = require('../models/user');
const User = require('../models/user');



exports.createUser = async (req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;

        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return res.status(400).json({ msg: "Email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            nom,
            prenom,
            email,
            hashedPassword
        })
        const savedUser = await newUser.save();
        res.status(201).json({ message: "utilistaeur cree" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "erreur de creation d'utilisateur" })
    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur introuvable' })
        }
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            user.falseLogin += 1
            await user.save()
            console.log(user);
            return res.status(401).json({ message: 'Authentification echoué' })

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '180s' });
        res.status(200).json({ message: 'connexion reussie', data: token })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("erreur de creation d'utilisateur")
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users });
    } catch (err) {
        res.status(500).json({ message: "erreur lors de la recuperation des utilisateurs" })
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params.id;
    try {
        const user = await user.findById(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        res.status(200).json({ message: 'Utilisateur trouvé', data: user });
    } catch (error) {
        console(error);
        res.status(500).json({ message: `Erreur interne du serveur.${error}` });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params.id;
    try {
        const user = await user.findById(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        const updateduser = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.status(200).json({ message: 'Utilisateur modifie', data: updateduser });
    } catch (error) {
        console(error);
        res.status(500).json({ message: `Erreur interne du serveur.${error}` });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params.id;
    try {
        const user = await user.findById(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        const updateduser = await User.findByIdAndDelete(id, { ...req.body }, { new: true });
        res.status(200).json({ message: 'Utilisateur supprime', data: updateduser });
    } catch (error) {
        console(error);
        res.status(500).json({ message: `Erreur interne du serveur.${error}` });
    }
}
exports.logout = async (req, res) => {
    // On vide le contenu de la session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error when log out : ', err);
            return res.status(500).json({ message: "erreur  lors de la déconnexion" })
        }
        res.status(200).json({ message: "Déconnexion réussie" })
    })
}