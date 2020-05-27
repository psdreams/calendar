import React from 'react';

const Calendar = (props) => {

	const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	const monthNamesAlt = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
		'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
	const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	const dayNamesMin = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	const currentDay = props.date.getDate();
	const currentMonth = props.date.getMonth();

	const currentYear = props.date.getFullYear();
	//первое число текущего месяца
	const current = new Date(currentYear, currentMonth);
	//первое число следующего месяца
	const next = new Date(currentYear, currentMonth + 1);
	//число дней текущего месяца
	const diff = (next - current) / (1000 * 3600 * 24);
	//индекс дня недели, начиная с понедельника=0
	let currentWeekDay = (current.getDay() + 6) % 7;

	const cols = 7;
	const rows = Math.ceil((currentWeekDay + diff) / cols);


	let table = [],
		tr,
		k = 1 - currentWeekDay;

	for (let i = 0; i < rows; i++) {
		tr = [];
		for (let j = 0; j < cols; j++) {
			tr.push(<td key={k} className={k === currentDay ? 'ui-datepicker-today' : null}>{k > 0 && k <= diff ? k : ''}</td>);
			k++;
		}
		table.push(<tr key={i}>{tr}</tr>);
	}

	return (
		<div className="ui-datepicker">
			<div className="ui-datepicker-material-header">
				<div className="ui-datepicker-material-day">{dayNames[currentWeekDay]}</div>
				<div className="ui-datepicker-material-date">
					<div className="ui-datepicker-material-day-num">{currentDay}</div>
					<div className="ui-datepicker-material-month">{monthNamesAlt[currentMonth]}</div>
					<div className="ui-datepicker-material-year">{currentYear}</div>
				</div>
			</div>

			<div className="ui-datepicker-header">
				<div className="ui-datepicker-title">
					<span className="ui-datepicker-month">{monthNames[currentMonth]}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
				</div>
			</div>

			<table className="ui-datepicker-calendar">
				<colgroup>
					<col></col>
					<col></col>
					<col></col>
					<col></col>
					<col></col>
					<col className="ui-datepicker-week-end"></col>
					<col className="ui-datepicker-week-end"></col>
				</colgroup>
				<thead>
					<tr>
						{dayNamesMin.map(name => <th scope="col" title={name} key={name}>{name}</th>)}
					</tr>
				</thead>
				<tbody>
					{table}
				</tbody>
			</table>
		</div>
	);
}

export default Calendar;
