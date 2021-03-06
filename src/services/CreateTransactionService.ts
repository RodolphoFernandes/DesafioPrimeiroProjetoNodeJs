import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    const balance = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error(
        'Transação não permitida o valor ultrapassa o saldo em conta',
      );
    }

    return transaction;
  }
}

export default CreateTransactionService;
