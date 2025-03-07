import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
    res.cookie('token', token, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
    })
}
export default generateToken;