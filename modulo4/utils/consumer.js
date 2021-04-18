const Kkc = Symbol('kafka-consumer');

class Consumer {
  constructor(kafka, groupId) {
    this[Kkc] = kafka.consumer({ groupId });
  }


  async subscribe(topico,callback) {
    try {
      await this[Kkc].connect();
      await this[Kkc].subscribe({ topic: topico, fromBeginning: true });
      await this[Kkc].run({
        eachMessage: async ({ topic, partition, message }) => {
          await callback({ topic, partition, message })
        },
      });
    } catch (e) {
      console.log('Deu ruim no consumer ', e);
    }
  }



}

module.exports = Consumer;