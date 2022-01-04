const path = '../src/data.json';

class Table {
  table = document.querySelector('.table');
  currentId = '';

  constructor(path) {
    this.path = path;
  }

  // выводим данные из json-файла в таблицу
  async fetchData() {
    const response = await fetch(this.path);
    const data = await response.json();
    this.totalPages = data.length / this.itemPerPage;

    this.showData(data);
  }

  showData(data) {
    console.log(this.totalPages);
    data.forEach((person) => {
      const row = document.createElement('tr');

      const { name, about, eyeColor, id } = person;
      const { firstName, lastName } = name;
      const attrArray = [firstName, lastName, about, eyeColor];

      row.id = id;
      row.onclick = () => this.sendToForm(id);

      attrArray.forEach((attr) => {
        const cell = document.createElement('td');
        cell.classList.add('td');
        const div = document.createElement('div');
        div.classList.add('td__div');
        const cellText = document.createTextNode(attr);

        switch (attr) {
          case firstName:
            cell.classList.add('firstName');
            break;

          case lastName:
            cell.classList.add('lastName');
            break;

          case about:
            div.classList.add('about');

            cell.classList.add('about');
            break;
          case eyeColor:
            div.style.background = eyeColor;
            div.style.height = '100%';
            div.style.width = '100%';
            div.style.color = eyeColor;

            cell.classList.add('eyeColor');
            break;
        }

        div.appendChild(cellText);
        cell.appendChild(div);
        row.appendChild(cell);
      });
      this.table.appendChild(row);
    });
  }

  // отправляем данные в форму на событии onclick
  sendToForm(id) {
    document.querySelector('.form-container').classList.add('show');
    this.currentId = id;
    const cells = [...document.getElementById(id).cells];
    const values = cells.map((cell) => cell.innerText);

    document.getElementById('firstName').value = values[0];
    document.getElementById('lastName').value = values[1];
    document.getElementById('about').value = values[2];
    document.getElementById('eyeColor').value = values[3];
    console.log(this.currentId);
  }

  // изменяем данные таблицы на событии onsubmit
  sendToTable(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const about = document.getElementById('about').value;
    const eyeColor = document.getElementById('eyeColor').value;

    if (firstName && lastName && about && eyeColor) {
      document.querySelector('.form-container').classList.remove('show');
      const newValues = [firstName, lastName, about, eyeColor];

      const cells = [...document.getElementById(this.currentId).cells];
      cells.forEach((cell, index) => {
        console.log(cell.children[0].innerText);
        cell.children[0].innerText = newValues[index];
        // меняем цвет последней клетки (eyeColor)
        if (index === 3) {
          cell.children[0].style.background = eyeColor;
          cell.children[0].style.color = eyeColor;
        }
      });
    } else {
      alert('Заполните поля!');
    }
  }
}

// экземпляр таблицы
const table = new Table(path);
