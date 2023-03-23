const requireAdmin = (req, res, next) => {
    if ("641a2591a499d434f007334b" !== req.user._id.toString()) {
        const error = new Error("No tiene permisos para realizar esta acción");
        res.status(401).json({ msg: error.message });
    } else {
        next();
    }
}

export default requireAdmin;
