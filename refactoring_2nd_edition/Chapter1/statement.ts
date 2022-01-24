/** Chapter1：重构：第一个示例 */
import createStatementData from './createStatementData.js';
import { Invoice, Plays } from './type';

const plays = {
	hamlet: { name: 'Hamlet', type: 'tragedy' },
	'as-like': { name: 'As You Like It', type: 'comedy' },
	othello: { name: 'Othello', type: 'tragedy' },
};

const invoices: Invoice[] = [
	{
		customer: 'BigCo',
		performances: [
			{
				playID: 'hamlet',
				audience: 55,
			},
			{
				playID: 'as-like',
				audience: 35,
			},
			{
				playID: 'othello',
				audience: 40,
			},
		],
	},
];

const invoice: Invoice = {
	customer: 'BigCo',
	performances: [
		{
			playID: 'hamlet',
			audience: 55,
		},
		{
			playID: 'as-like',
			audience: 35,
		},
		{
			playID: 'othello',
			audience: 40,
		},
	],
};

//1.1 起点----------------------------------------------------------------------------------------------
function beginning() {
	//打印帐单详情
	function statement(invoice: Invoice, plays: Plays) {
		return renderPlainText(createStatementData(invoice, plays));
	}

	function renderPlainText(data) {
		let result = `Statement for ${data.customer}\n`;

		for (let perf of data.performances) {
			result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
		}

		result += `Amount owed is ${usd(data.totalAmount)}\n`;
		result += `You earned ${data.totalVolumeCredits} credits\n`;

		return result;
	}

	function htmlStatement(invoice: Invoice, plays: Plays) {
		return renderHtml(createStatementData(invoice, plays));
	}

	function renderHtml(data) {
		let result = `<h1>Statement for ${data.customer}</h1>\n`;
		result += '<table>\n';
		result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>';
		for (let perf of data.performances) {
			result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
			result += `<td>${usd(perf.amount)}</td></tr>\n`;
		}
		result += '</table>\n';
		result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
		result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
		return result;
	}

	function usd(aNumber: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(aNumber / 100);
	}

	console.log(htmlStatement(invoice, plays));
}

beginning();

//1.2 对此起始程序的评价----------------------------------------------------------------------------------------------
//如果我需要修改一个有几百行代码的程序，我会期望它有良好的结构，并且已经被分解成一系列函数
//和其他程序要素，这能帮我更易于清楚地了解这段代码在做什么。如果程序杂乱无章，先为它整理出结构来，
//再做需要的修改，通常来说更加简单

//如果你要给程序添加一个特性，但发现代码因缺乏良好的结构而不易于进行更改，那就先重构那个程序，
//使其比较容易添加该特性，然后再添加该特性。

//1.3 重构的第一步----------------------------------------------------------------------------------------------
//重构前，先检查自己是否有一套可靠的测试集。这些测试必须有自我检验能力。

//1.4 分解 statement 函数----------------------------------------------------------------------------------------------

//重构技术就是以微小的步伐修改程序。如果你犯下错误，很容易便可发现它。

//完成提炼函数（106）手法后，我会看看提炼出来的函数，看是否能进一步提升其表达能力。
//一般我做的第一件事就是给一些变量改名，使它们更简洁，比如将 thisAmount 重命名为 result。

//使用一门动态类型语言（如 JavaScript）时，跟踪变量的类型很有意义。因此，
//我为参数取名时都默认带上其类型名。一般我会使用不定冠词修饰它，除非命名中另有解释其角色的相关信息。

//好代码应能清楚地表明它在做什么，而变量命名是代码清晰的关键。
//只要改名能够提升代码的可读性，那就应该毫不犹豫去做。

//正如我上面所指出的，临时变量往往会带来麻烦。它们只在对其进行处理的代码块中有用，
//因此临时变量实质上是鼓励你写长而复杂的函数。

//好的命名十分重要，但往往并非唾手可得。只有恰如其分地命名，才能彰显出将大函数分解成小函数的价值。
//有了好的名称，我就不必通过阅读函数体来了解其行为。但要一次把名取好并不容易，
//因此我会使用当下能想到最好的那个。如果稍后想到更好的，我就会毫不犹豫地换掉它。
//通常你需要花几秒钟通读更多代码，才能发现最好的名称是什么。

//对于重构过程的性能问题，我总体的建议是：大多数情况下可以忽略它。如果重构引入了性能损耗，先完成重构，再做性能优化。

//与复杂代码打交道时，细小的步子是快速前进的关键

//1.5 进展：大量嵌套函数----------------------------------------------------------------------------------------------
//现在代码结构已经好多了。顶层的 statement 函数现在只剩 7 行代码，而且它处理的都是与打印详单相关的逻辑。
//与计算相关的逻辑从主函数中被移走，改由一组函数来支持。每个单独的计算过程和详单的整体结构，都因此变得更易理解了。

//1.6 拆分计算阶段与格式化阶段----------------------------------------------------------------------------------------------
//现在我只是简单地返回了一个 aPerformance 对象的副本，但马上我就会往这条记录中添加新的数据。
//返回副本的原因是，我不想修改传给函数的参数，我总是尽量保持数据不可变（immutable）——可变的状态会很快变成烫手的山芋。

//1.7 进展：分离到两个文件（和两个阶段）----------------------------------------------------------------------------------
//代码行数由我开始重构时的 44 行增加到了 70 行（不算 htmlStatement），这主要是将代码抽取到函数里带来的额外包装成本。
//虽然代码的行数增加了，但重构也带来了代码可读性的提高。额外的包装将混杂的逻辑分解成可辨别的部分，
//分离了详单的计算逻辑与样式。这种模块化使我更容易辨别代码的不同部分，了解它们的协作关系。
//虽说言以简为贵，但可演化的软件却以明确为贵。通过增强代码的模块化，我可以轻易地添加 HTML 版本的代码，
//而无须重复计算部分的逻辑。

//保证离开时的代码库一定比你来时更加健康。完美的境界很难达到，但应该时时都勤加拂拭

//1.8 按类型重组计算过程-----------------------------------------------------------------------------------------------------
//接下来我将注意力集中到下一个特性改动：支持更多类型的戏剧，
//以及支持它们各自的价格计算和观众量积分计算。

//我的设想是先建立一个继承体系，它有“喜剧”（comedy）和“悲剧”（tragedy）两个子类，子类各自包含独立的计算逻辑。
//调用者通过调用一个多态的 amount 函数，让语言帮你分发到不同的子类的计算过程中。

//1.9 进展：使用多态计算器来提供数据----------------------------------------------------------------------------------------------------
//如果大多数修改都涉及特定类型的计算，像这样按类型进行分离就很有意义。当添加新剧种时，
//只需要添加一个子类，并在创建函数中返回它。

//这个示例还揭示了一些关于此类继承方案何时适用的洞见。上面我将条件分支的查找从两个不同的函数（amountFor 和
// createPerformanceCalculator 中。有越多的函数依赖于同一套类型进行多态，这种继承方案就越有益处。

//1.10 结语----------------------------------------------------------------------------------------------------
//本章的重构有 3 个较为重要的节点，分别是：
//##将原函数分解成一组嵌套的函数、
//##应用拆分阶段（154）分离计算逻辑与输出格式化逻辑，
//##以及为计算器引入多态性来处理计算逻辑。
//每一步都给代码添加了更多的结构，以便我能更好地表达代码的意图。

//好代码的检验标准就是人们是否能轻而易举地修改它。
//## 增加一个同类功能（快速）
//## 修改其中一个功能（快速）
//## 定位某个功能（快速）
