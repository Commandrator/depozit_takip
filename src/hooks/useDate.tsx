const useDate = () => {
    /**
     * İki tarihi karşılaştırır. İlk tarih ikinci tarihten büyükse true döner.
     * @param first İlk tarih
     * @param second İkinci tarih
     * @returns boolean
     */
    const comparisonOfTheDay = (first: Date, second: Date): boolean => {
        return first.getTime() > second.getTime();
    };
    /**
     * Tarih ayırıcı. gönderilen tarihler belirli parçalara bölünerek döndürülmesi sağlanılır.
     * @param day 
     * @returns obejct
     */
    const dayParser = (day: Date): object => {
        const yyyy = day.getFullYear();
        const mm = day.getMonth() + 1; // Ayı alır (1-12, 0 tabanlı olduğu için +1)
        const dd = day.getDate();
        const hh = day.getHours();
        const mn = day.getMinutes();
        const ssss = day.getSeconds();    
        return {
            year: { yyyy, mm, dd },
            time: { hh, mn, ssss }
        };
    };
    
    /**
     * Tarih ayırıcı. gönderilen tarihler belirli parçalara bölünerek döndürülmesi sağlanılır.
     * @param date tarih
     * @param daysToAdd üzerine eklemek istediğin gün sayısı
     * @returns Date
     */
    const addDaysToDate = (date: Date, daysToAdd: number): Date => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + daysToAdd);
        return newDate;
    };
    
    return {
        comparisonOfTheDay,
        dayParser,
        addDaysToDate
    };
};

export default useDate;
