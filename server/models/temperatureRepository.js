class TemperatureRepository {

    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS temperatures (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            temp1 REAL,
            temp2 REAL,
            temp3 REAL,
            temp4 REAL,
            date TEXT
        )`
        return this.dao.run(sql)
    }

    create(temp1, temp2, temp3, temp4, date) {
        return this.dao.run(
            `INSERT INTO temperatures (temp1, temp2, temp3, temp4, date)
            VALUES (?, ?, ?, ?, ?)`,
            [temp1, temp2, temp3, temp4, date]
        )
    }

    update(measurement) {
        const { id, temp1, temp2, temp3, temp4, date } = measurement
        return this.dao.run(
            `UPDATE temperatures
            SET 
            temp1 = ?,
            temp2 = ?,
            temp3 = ?,
            temp4 = ?,
            date = ?
            WHERE id = ?
            `,
            [temp1, temp2, temp3, temp4, date, id]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM temperatures WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM temperatures WHERE id = ?`,
            [id]
        )
    }

    getAllByDate(date) {
        return this.dao.all(`SELECT * FROM temperatures WHERE date LIKE ?`,
            [date + "%"]
        )
    }

}

module.exports = TemperatureRepository;