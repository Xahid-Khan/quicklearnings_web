"use client";
import Loading from "@/components/LoadingScreen";
import QuizOptions from "@/components/QuizOptions";
import { useAuthModalContext } from "@/contexts/authContext";
import { useUserContext } from "@/contexts/userContext";
import { enterFullScreenMode } from "@/utils/utils";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

const DynamicQuizOptions = () => {
  const { userId } = useUserContext();
  const { setAuthModalIsOpen } = useAuthModalContext();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [quizType, setQuizType] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<number | string | null>(null);
  const [topicId, setTopicId] = useState<number | string | null>(null);
  const [limit, setLimit] = useState<number | string>(30);

  useEffect(() => {
    const activeQuiz = localStorage.getItem("quiz_started");
    if (activeQuiz) {
      const parsedData = JSON.parse(activeQuiz);

      if (dayjs().diff(dayjs(parsedData.startTime)) / (1000 * 60 * 60) > 1) {
        localStorage.removeItem("quiz_started");
      } else {
        enterFullScreenMode();
        router.replace("/quiz/attempt");
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleStartQuizButton = () => {
    if (userId && quizType && subjectId && topicId) {
      localStorage.setItem(
        "quiz_started",
        JSON.stringify({
          startTime: new Date().toString(),
          quizType,
          subjectId,
          topicId,
          limit,
        }),
      );
      router.replace("/quiz/attempt");
    } else {
      setAuthModalIsOpen(true);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <QuizOptions
        subjectId={subjectId}
        setSubjectId={setSubjectId}
        topicId={topicId}
        quizType={quizType}
        setTopicId={setTopicId}
        limit={limit}
        setLimit={setLimit}
        setQuizType={setQuizType}
        handleStartQuizButton={handleStartQuizButton}
      />
    </Suspense>
  );
};

export default DynamicQuizOptions;
