import accountModel from "../models/account.models.js";

export const createAccountController = async (req, res) => {
    try {
        const user = req.user;
        const account = await accountModel.create({
            user: user._id
        })
        res.status(201).json({ message: "Account created successfully", account });
    } catch (error) {
        res.status(500).json({ message: "Error creating account", error: error.message });
    }
}
export const getAccountBalanceController = async (req, res) => {
    try {
        const { accountId } = req.params;
        const user = req.user;

        // look for the account owned by the authenticated user
        const account = await accountModel.findOne({
            _id: accountId,
            user: user._id
        });
        if (!account) {
            return res.status(404).json({
                message: 'Account not found'
            });
        }
        const balance = await account.getBalance();

        res.status(200).json({ accountId: account._id, balance });
    } catch (error) {
        res.status(500).json({ message: "Error fetching account balance", error: error.message });
    }
}